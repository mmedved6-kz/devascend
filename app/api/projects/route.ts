import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateProjectWithAI } from '@/lib/ai';
import { canCreateProject, createProject, ProjectInput } from '@/lib/projects';

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json();
    const { skills, difficulty, experience } = body;

    // Validate input
    if (!skills || !Array.isArray(skills) || !difficulty) {
      return NextResponse.json(
        { error: 'Invalid input. Skills array and difficulty are required' },
        { status: 400 }
      );
    }

    // Check if user can create a project (subscription limits)
    const eligibilityCheck = await canCreateProject(userId);
    
    if (!eligibilityCheck.success) {
      return NextResponse.json(
        { error: 'Failed to check project creation eligibility' },
        { status: 500 }
      );
    }
    
    if (!eligibilityCheck.canCreate) {
      return NextResponse.json(
        { 
          error: 'You have reached your monthly project limit',
          projectsThisMonth: eligibilityCheck.projectsThisMonth,
          isFreeTier: true
        },
        { status: 403 }
      );
    }

    // Generate project with AI
    const result = await generateProjectWithAI(skills, difficulty, experience);
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to generate project' },
        { status: 500 }
      );
    }

    // Save the project to the database
    if (!result.project || !result.project.title || !result.project.description || 
        !result.project.scenario || !result.project.skills || !result.project.difficulty) {
      return NextResponse.json(
        { error: 'Incomplete project data from AI generation' },
        { status: 500 }
      );
    }
    
    const projectData: ProjectInput = {
      title: result.project.title,
      description: result.project.description,
      scenario: result.project.scenario,
      skills: result.project.skills,
      difficulty: result.project.difficulty,
      userId
    };
    
    const creationResult = await createProject(projectData, result.project.tasks || []);
    
    if (!creationResult.success) {
      return NextResponse.json(
        { error: 'Failed to save project' },
        { status: 500 }
      );
    }

    // Return the created project
    return NextResponse.json({
      success: true,
      project: creationResult.project
    });
    
  } catch (error) {
    console.error('Error generating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

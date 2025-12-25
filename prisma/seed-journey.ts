import type { PrismaClient } from "../generated/prisma/client";

export async function seedJourney(prisma: PrismaClient) {
  console.log("Seeding Journey Steps...");

  const steps = [
    {
      order: 1,
      title: "New Believer",
      description: "Laying the foundation of your faith.",
      mission: "Complete the foundations course and start reading the Bible.",
      iconName: "BookOpen", // Mapping to Lucide icon
      objectives: [
        "Complete 'Foundations of Faith' course",
        "Read the Gospel of John",
        "Join a local network or church",
        "Share your testimony with one person",
      ],
    },
    {
      order: 2,
      title: "Sharer",
      description: "Learning to share the Gospel effectively.",
      mission: "Share the Gospel with 5 people and track your conversations.",
      iconName: "Share2",
      objectives: [
        "Complete 'Effective Evangelism' training",
        "Share the Gospel with 5 people",
        "Log 5 evangelism interactions",
        "Identifying your 'Oikos' (sphere of influence)",
      ],
    },
    {
      order: 3,
      title: "Trainer",
      description: "Discipling new believers and training others.",
      mission: " disciple a new believer and help them reach the Sharer level.",
      iconName: "Users",
      objectives: [
        "Complete 'Discipleship 101' course",
        "Mentor 1 New Believer",
        "Lead a small group study",
        "Help a mentee share the Gospel",
      ],
    },
    {
      order: 4,
      title: "Ambassador",
      description: "Leading networks and multiplying disciples.",
      mission: "Oversee a network of trainers and sharers.",
      iconName: "Globe",
      objectives: [
        "Complete 'Leadership & Multiplication' course",
        "Oversee 3 Transformers",
        "Organize a local outreach event",
        "Plant a new network branch",
      ],
    },
  ];

  for (const step of steps) {
    const createdStep = await prisma.journeyStep.upsert({
      where: { order: step.order },
      update: {
        title: step.title,
        description: step.description,
        mission: step.mission,
        iconName: step.iconName,
      },
      create: {
        order: step.order,
        title: step.title,
        description: step.description,
        mission: step.mission,
        iconName: step.iconName,
      },
    });

    // Create objectives
    for (const objectiveText of step.objectives) {
      // Simple ID generation for objectives based on step and index could be improved
      // but for seeding, we'll let Prisma handle the IDs or just recreate them
      // To avoid duplicates on re-seed, we might want to check existence or just delete all for step first
      // For simplicity in this "upsert" style, we will just create them if they don't exist by text match roughly

      // Ideally we want to sync objectives.
      // Strategy: Find existing by text + stepId. If not found, create.

      // Let's use a composite unique key constraint if possible, but schema says:
      // @@unique([journeyStepId, objectiveId]) -> objectiveId is string 'obj1'
      // We will generate stable objectiveIds for the seed: 'step1-obj1'
      const objIndex = step.objectives.indexOf(objectiveText) + 1;
      const objectiveId = `s${step.order}-o${objIndex}`;

      await prisma.journeyStepObjective.upsert({
        where: {
          journeyStepId_objectiveId: {
            journeyStepId: createdStep.id,
            objectiveId: objectiveId,
          },
        },
        update: {
          text: objectiveText,
        },
        create: {
          journeyStepId: createdStep.id,
          objectiveId: objectiveId,
          text: objectiveText,
        },
      });
    }
  }

  console.log("Journey Steps seeded successfully.");
}

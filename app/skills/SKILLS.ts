export type Skill = {
    id: string;
    name: string;
    description: string;
    category: string;
    createdAt: string;
    updatedAt: string;
};

export let SKILLS: Skill[] = [
  {
    id: "1",
    name: "Skill 1",
    description: "Description 1",
    category: "Category 1",
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
  },
  {
    id: "2",
    name: "Skill 2",
    description: "Description 2",
    category: "Category 2",
    createdAt: "2022-01-02",
    updatedAt: "2022-01-02",
  },
];

export async function getSkills() {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, 3000);
  })
  return [...SKILLS]
}

export async function addSkill(skill: Skill) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  SKILLS = [...SKILLS, skill]
  console.log('Skills updated', SKILLS)
  return getSkills()
}
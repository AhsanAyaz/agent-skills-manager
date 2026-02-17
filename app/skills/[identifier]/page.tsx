import { notFound } from "next/navigation";
import { getSkills } from "../SKILLS";

export default async function SkillPage({ params }: {
  params: { identifier: string }
}) {

  const skills = await getSkills()
  const { identifier } = await params
  const skill = skills.find((skill) => skill.id === identifier)
  if (!skill) {
    return notFound();
  }
  return <article className="max-w-md mx-auto p-4 flex flex-col gap-4">
    <h1>{skill.name}</h1>
    <p>{skill.description}</p>
    <p>{skill.category}</p>
    <p>{skill.createdAt}</p>
    <p>{skill.updatedAt}</p>
  </article>
    ;
}
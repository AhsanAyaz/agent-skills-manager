// app/actions/skills.ts
"use server";

import { addSkill } from "../skills/SKILLS";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSkill(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  
  if (!name || !description || !category) {
    return { message: "Please fill in all fields" };
  }

  const newSkill = {
    id: Date.now().toString(),
    name,
    description,
    category,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await addSkill(newSkill);
  revalidatePath("/skills");
  redirect("/skills");
}


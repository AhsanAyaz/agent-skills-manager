"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { createSkill } from "@/actions/skills";

/**
 * New Skill Page - CSR (Client-Side Rendering)
 * Uses client state for form handling
 */
export default function NewSkillPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("---\nname: my-skill\ndescription: What this skill does\n---\n\n# Skill Title\n\nInstructions for how to use this skill...\n");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && !isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createSkill(
        {
          name: name.trim(),
          description: description.trim(),
          content: content.trim(),
          isPublic,
        },
        user!.id
      );

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Failed to create skill");
      }
    } catch (err) {
      setError("An error occurred while creating the skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard" className="btn btn-ghost btn-sm gap-2">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl">Create New Skill</h1>
          <p className="text-base-content/70">
            Define your agent skill using markdown format
          </p>

          <form onSubmit={handleSubmit} className="mt-4">
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Skill Name</span>
              </label>
              <input
                type="text"
                placeholder="e.g., web-design-guidelines"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="Brief description of what this skill does"
                className="input input-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={500}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Skill Content (Markdown)</span>
              </label>
              <textarea
                placeholder="Enter your skill here"
                className="textarea textarea-bordered w-full h-64 font-mono text-sm skill-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-control mt-4">
              <label className="label cursor-pointer justify-start gap-4">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span className="label-text">Make this skill public</span>
              </label>
              <p className="text-sm text-base-content/60 ml-14">
                Public skills appear in the gallery and can be viewed by anyone
              </p>
            </div>

            <div className="card-actions justify-end mt-6">
              <Link href="/dashboard" className="btn btn-ghost">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  "Create Skill"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
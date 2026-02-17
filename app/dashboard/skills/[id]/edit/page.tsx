"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { updateSkill } from "@/actions/skills";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit Skill Page - CSR (Client-Side Rendering)
 * Uses client state for form handling with dynamic route
 */
export default function EditSkillPage({ params }: PageProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [skillId, setSkillId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingSkill, setLoadingSkill] = useState(true);

  // Get params
  useEffect(() => {
    params.then((p) => setSkillId(parseInt(p.id)));
  }, [params]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Fetch skill data
  useEffect(() => {
    if (skillId && user) {
      fetchSkill();
    }
  }, [skillId, user]);

  const fetchSkill = async () => {
    try {
      if (!skillId) return;

      // Cookies are automatically sent with fetch
      const response = await fetch(`/api/skills/${skillId}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.skill) {
          setName(data.skill.name);
          setDescription(data.skill.description);
          setContent(data.skill.content);
          setIsPublic(data.skill.isPublic);
        }
      } else if (response.status === 404) {
        setError("Skill not found");
      } else if (response.status === 403) {
        setError("You don't have permission to edit this skill");
      }
    } catch (err) {
      setError("Failed to load skill");
    } finally {
      setLoadingSkill(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !content.trim()) {
      setError("All fields are required");
      return;
    }

    if (!skillId || !user) return;

    setIsSubmitting(true);

    try {
      const result = await updateSkill(
        skillId,
        {
          name: name.trim(),
          description: description.trim(),
          content: content.trim(),
          isPublic,
        },
        user.id
      );

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Failed to update skill");
      }
    } catch (err) {
      setError("An error occurred while updating the skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || loadingSkill) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error && !name) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
        <Link href="/dashboard" className="btn btn-ghost mt-4">
          ← Back to Dashboard
        </Link>
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
          <h1 className="card-title text-2xl">Edit Skill</h1>
          <p className="text-base-content/70">
            Update your agent skill content
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Skill Name</span>
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Description</span>
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">
                  Skill Content (Markdown)
                </span>
              </label>
              <textarea
                placeholder="Enter your skill content in markdown format..."
                className="textarea textarea-bordered w-full h-64 font-mono text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
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

            <div className="flex justify-end gap-3 pt-4">
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { DeleteAccountSection } from "@/components/profile/delete-account-section";
import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { ProfileView } from "@/components/profile/profile-view";
import { trpc } from "@/lib/trpc/client";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const utils = trpc.useUtils();

  const { data: user, isLoading } = trpc.user.getProfile.useQuery();

  const handleEditSuccess = () => {
    setIsEditing(false);
    utils.user.getProfile.invalidate();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-center">
          <p className="text-destructive">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information and preferences
        </p>
      </div>

      <div className="space-y-6">
        {isEditing ? (
          <ProfileEditForm
            user={user}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleEditSuccess}
          />
        ) : (
          <ProfileView user={user} onEdit={() => setIsEditing(true)} />
        )}

        {!isEditing && <DeleteAccountSection />}
      </div>
    </div>
  );
}

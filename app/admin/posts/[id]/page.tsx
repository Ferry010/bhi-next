"use client";

import PostEditor from "../PostEditor";

export default function EditPostPage({ params }: { params: { id: string } }) {
  return <PostEditor id={params.id} />;
}

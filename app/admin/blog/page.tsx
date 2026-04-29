import { redirect } from "next/navigation";

// /admin/blog → /admin/dashboard (posts list lives there)
export default function AdminBlogRedirect() {
  redirect("/admin/dashboard");
}

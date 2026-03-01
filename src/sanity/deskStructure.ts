import type { StructureResolver } from "sanity/structure";
import { BlogPostsPane } from "./components/BlogPostsPane";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .child(
          S.document()
            .schemaType("homepage")
            .documentId("homepage")
        ),
      S.listItem()
        .title("Blog posts")
        .schemaType("post")
        .child(S.component(BlogPostsPane).title("Blog posts")),
      S.listItem()
        .title("About")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("about")
        ),
      S.listItem()
        .title("Contact")
        .child(
          S.document()
            .schemaType("contactPage")
            .documentId("contact")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["homepage", "aboutPage", "contactPage", "post"].includes(
            item.getId() ?? ""
          )
      ),
    ]);

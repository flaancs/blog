import { groq } from "next-sanity";

export const POSTS_QUERY = groq`*[_type == "post"] {
  _id, title, slug, mainImage, extract, "author" : author->{name}, publishedAt, "categories": categories[]->{title, slug}, "tags": tags[]->{name, slug}
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage, publishedAt, _updatedAt, extract, "author" : author->{name}, "categories": categories[]->{_id, title, slug}, "tags": tags[]->{_id, name, slug}
}`;

export const CATEGORIES_QUERY = groq`*[_type == "category"] {
  _id, title, slug
}`;

export const TAGS_QUERY = groq`*[_type == "tag"] {
  _id, name, slug
}`;

export const CATEGORY_AND_POSTS_QUERY = groq`*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug, description, "posts": *[_type == "post" && references(^._id)]{
    _id, title, slug, mainImage, publishedAt, extract, "author" : author->{name}, "categories": categories[]->{title, slug}, "tags": tags[]->{name, slug}
  }
}`;

export const TAG_AND_POSTS_QUERY = groq`*[_type == "tag" && slug.current == $slug][0]{
  _id, name, slug, description, "posts": *[_type == "post" && references(^._id)]{
    _id, title, slug, mainImage, publishedAt, extract, "author" : author->{name}, "categories": categories[]->{title, slug}, "tags": tags[]->{name, slug}
  }
}`;

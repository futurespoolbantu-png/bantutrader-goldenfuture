<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public SEO metadata uses a shared leaf-head helper and root-validated language search state so SSR, sharing and language links agree.
- Sitemap route inventory requires an explicit staticData.sitemap decision on every route; dynamic articles use paginated session-free public reads to preserve publication visibility.
- Contact writes are validated in an internal server function using the existing anonymous insert policy; privileged clients and auth/RLS changes are not required.
- Apply HTML security headers at the server response boundary, including error pages, without changing non-HTML webhook/API responses.

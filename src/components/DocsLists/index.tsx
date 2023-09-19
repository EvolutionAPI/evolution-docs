import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import React from "react";
import clsx from "clsx";

import styles from "./index.module.css";

type DocSrc = {
  id: string;
  path: string;
  sidebar: string;
};
type Doc = {
  category: string;
  docs: {
    path: string;
    name: string;
  }[];
};
export default function DocsLists() {
  const docsData: DocSrc[] = usePluginData("docusaurus-plugin-content-docs")[
    "versions"
  ][0]["docs"];
  const unSlug = (slug: string) => {
    let slugParsed = slug
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    slugParsed = slugParsed
      .split("_")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("/");
    return slugParsed;
  };

  const docsParsed = docsData.reduce<Doc[]>((acc, doc, i) => {
    let [category, item] = doc.id.split("/");
    const catIndex = category.split("-")[0];
    const itemIndex = item.split("-")[0];
    category = category.slice(catIndex.length);
    item = item.slice(itemIndex.length);

    const categoryObj: Doc = acc.find(
      (obj) => obj.category === unSlug(category)
    );

    if (categoryObj) {
      categoryObj.docs.push({ name: unSlug(item), path: doc.path });
    } else {
      acc.push({
        category: unSlug(category),
        docs: [{ name: unSlug(item), path: doc.path }],
      });
    }

    return acc;
  }, []);

  return (
    <div
      className={clsx("container padding-horiz--lg", styles.docsListsWrapper)}
    >
      <div className="row">
        {docsParsed.map((doc, i) => (
          <div
            className={clsx("col col--4 padding-vert--lg", styles.docsListCol)}
            key={i}
          >
            <h3>
              {doc.category}{" "}
              <small className="badge badge--secondary">
                {doc.docs.length}
              </small>
            </h3>
            <ul className={styles.docList}>
              {doc.docs.map((doc, i) => (
                <li key={i}>
                  <Link to={doc.path}>{doc.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

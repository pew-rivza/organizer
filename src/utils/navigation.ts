import { navigation } from "const/navigation";
import { Routing } from "types/other";

export const getRoutings = (): Routing[] => {
  return navigation.reduce((previousRouting, navItem) => {
    const { link, index, element, title, subpages } = navItem;
    let navRouting: Routing[] = [];
    let subpageRouting: Routing[] = [];

    if (element && title) {
      navRouting = [{ path: link.slice(1), index, element, title }];

      if (subpages) {
        subpageRouting = subpages
          .map((subpage): Routing | false => {
            if (subpage.element && subpage.title) {
              return {
                path: subpage.link.slice(1),
                title: subpage.title,
                element: subpage.element,
              };
            }
            return false;
          })
          .filter(Boolean) as Routing[];
      }

      return [...previousRouting, ...navRouting, ...subpageRouting];
    }

    return [...previousRouting];
  }, [] as Routing[]);
};

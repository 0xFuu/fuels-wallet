import type { ThemeUtilsCSS } from "@fuel-ui/css";
import { cssObj } from "@fuel-ui/css";
import { Box, Flex } from "@fuel-ui/react";
import type { FC, ReactNode } from "react";
import { useContext, createContext } from "react";
import { Helmet } from "react-helmet";

import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

type Context = {
  isLoading?: boolean;
};

const ctx = createContext<Context>({});

type ContentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: any;
  children: ReactNode;
  css?: ThemeUtilsCSS;
};

function Content({ as, children, css }: ContentProps) {
  return (
    <Box as={as} css={{ ...styles.content, ...css }}>
      {children}
    </Box>
  );
}

export type LayoutProps = {
  isLoading?: boolean;
  title?: string;
  children: ReactNode;
};

type LayoutComponent = FC<LayoutProps> & {
  Content: typeof Content;
  TopBar: typeof TopBar;
  BottomBar: typeof BottomBar;
};

export const Layout: LayoutComponent = ({
  isLoading,
  title,
  children,
}: LayoutProps) => {
  const titleText = title ? `${title} | Verify` : "Verify";
  return (
    <ctx.Provider value={{ isLoading }}>
      <Helmet>
        <title>{titleText}</title>
      </Helmet>
      <Flex as="main" css={styles.root}>
        <Flex css={styles.wrapper}>{children}</Flex>
      </Flex>
    </ctx.Provider>
  );
};

Layout.Content = Content;
Layout.TopBar = TopBar;
Layout.BottomBar = BottomBar;

const styles = {
  root: cssObj({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minH: "100vh",
  }),
  wrapper: cssObj({
    flexDirection: "column",
    width: "350px",
    minHeight: "615px",
    borderRadius: "$md",
    background:
      "linear-gradient(210.43deg, #0E221B 0%, #071614 10.03%, #0C0E0D 18.38%)",
  }),
  content: cssObj({
    py: "$4",
    px: "$6",
    flex: 1,
  }),
};

export function useLayoutContext() {
  return useContext(ctx);
}
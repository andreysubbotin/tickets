import { Box } from "@mui/material";
import { ReactNode } from "react";
import { RaRecord, useRecordContext } from "react-admin";

export interface FieldHighlighterProps {
  source: string;
  children: ReactNode;
  sortable?: boolean;
}

export const FieldHighlighter = (props: FieldHighlighterProps) => {
  const { source, children } = props;
  const record: RaRecord = useRecordContext();
  if (source == null) {
    return null;
  }

  const isHighlighted = record["highlightFields"]?.includes(source.replace("content.", ""));

  return (
    <Box
      sx={(theme) =>
        isHighlighted
          ? {
              position: "relative",
              "&:before": {
                position: "absolute",
                background: theme.palette.primary.main,
                opacity: theme.palette.action.selectedOpacity,
                content: "''",
                width: "100%",
                height: "100%",
              },
            }
          : {}
      }
    >
      {children}
    </Box>
  );
};

FieldHighlighter.defaultProps = {
  sortable: false,
};

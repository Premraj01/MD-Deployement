import React from "react";
import { Button } from "@material-ui/core";
import {
  NotificationsNone as NotificationsIcon,
  CheckCircle as SuccessIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  Cancel as FailIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";
import tinycolor from "tinycolor2";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

const typesIcons = {
  "e-commerce": <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <SuccessIcon />,
  delivered: <FailIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
};

export default function Notification({ variant, ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: classes.notificationIcon,
    },
    style: {
      color:
        variant !== "contained" &&
        theme.palette[props.color] &&
        theme.palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[props.color] &&
          theme.palette[props.color].main,
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === "contained",
          [classes.notificationIconContainerRounded]: variant === "rounded",
        })}
        style={{
          backgroundColor:
            variant === "rounded" &&
            theme.palette[props.color] &&
            tinycolor(theme.palette[props.color].main)
              .setAlpha(0.15)
              .toRgbString(),
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === "contained",
          })}
          variant={props.typographyVariant}
          size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {props.message}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}

// ####################################################################
function getIconByType(type = "offer") {
  return typesIcons[type];
}

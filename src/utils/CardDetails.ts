import { URLRoutes } from "URLRoutes";

export const cardDetails = [
  {
    title: "User Management",
    desc: "User Details",
    link: URLRoutes.clients.userMangement,
    svg: "user",
  },
  {
    title: "Image Factory",
    desc: "List of Images",
    link: URLRoutes.clients.imageFactorySearch,
    svg: "image",
  },
  {
    title: "PPT Factory",
    desc: "Template Details",
    link: URLRoutes.clients.pptFactory,
    svg: "file",
  },
  {
    title: "Image Training",
    desc: "Create Images through prompt",
    link: URLRoutes.clients.imageTraining,
    svg: "images outline",
  },
  {
    title: "PNG SVG Report",
    desc: "Details of Png Svg Images",
    link: URLRoutes.clients.pngSvg,
    // svg: "sync",
    svg: "archive"
  },
  {
    title: "Training Queue",
    desc: "Training Queue",
    link: URLRoutes.clients.trainingQueue,
    // svg: "sync",
    svg: "newspaper outline"
  },
  {
    title: "Logs",
    desc: "Logs",
    link: URLRoutes.clients.logs,
    // svg: "sync",
    svg: "th"
  },
];
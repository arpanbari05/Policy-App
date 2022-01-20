import { context, createResponseComposition, rest } from "msw";
import { createEnquiryResponse } from "../test/data/enquiry";
import { frontendBootResponse } from "../test/data/frontendBoot";

export const handlers = [
  rest.get(
    `https://dev-healthapi.fynity.in/api/v1/frontend-boot`,
    (_req, _res, ctx) => {
      return delayedResponse(ctx.status(200), ctx.json(frontendBootResponse));
    },
  ),
  rest.get(
    `https://dev-healthapi.fynity.in/api/v1/enquiries`,
    (_req, _res, ctx) => {
      return delayedResponse(ctx.status(200), ctx.json(createEnquiryResponse));
    },
  ),
  rest.post(
    `https://dev-healthapi.fynity.in/api/v1/enquiries`,
    (_req, _res, ctx) => {
      return delayedResponse(ctx.status(201), ctx.json(createEnquiryResponse));
    },
  ),
];

const delayedResponse = createResponseComposition(null, [
  context.delay("real"),
]);

// NOTE: Runtime sequences are mounted from JSON (see json-sequences/*). This file only exports handlers.
import { EventRouter } from "@renderx-plugins/host-sdk";
import { randomUUID } from "node:crypto";

export const handlers = {
  async publishCreateRequested(data: any, ctx: any) {
    const correlationId =
      data?.correlationId || randomUUID() || String(Date.now());
    await EventRouter.publish(
      "canvas.component.create.requested",
      {
        component: data.component,
        position: data.position,
        containerId: data.containerId,
        correlationId,
      },
      ctx.conductor
    );
  },
};


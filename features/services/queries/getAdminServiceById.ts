import mongoose from "mongoose";

import Service from "@/models/Service";

export async function getAdminServiceById(
  id: string,
) {
  if (
    !mongoose.Types.ObjectId.isValid(
      id,
    )
  ) {
    return null;
  }

  const service =
    await Service.findById(id).lean();

  if (!service) {
    return null;
  }

  return {
    ...service,
    id: service._id.toString(),
    _id: undefined,
  };
}
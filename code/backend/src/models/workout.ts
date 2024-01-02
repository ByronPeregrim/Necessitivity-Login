import { InferSchemaType, model, Schema } from "mongoose";

const workoutSchema = new Schema(
  {
    calories: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

type Workout = InferSchemaType<typeof workoutSchema>;

export default model<Workout>("Workout", workoutSchema);

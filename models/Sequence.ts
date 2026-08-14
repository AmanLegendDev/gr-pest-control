import mongoose, {
  Model,
  Schema,
  Document,
} from "mongoose";

export interface ISequence extends Document {
  name: string;
  value: number;
}

const SequenceSchema =
  new Schema<ISequence>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
      },

      value: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },
    },
    {
      timestamps: true,
    },
  );

const Sequence: Model<ISequence> =
  mongoose.models.Sequence ||
  mongoose.model<ISequence>(
    "Sequence",
    SequenceSchema,
  );

export default Sequence;
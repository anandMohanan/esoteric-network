import { buildClient, getDeployPreviewBranch } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "session",
    checkConstraints: {},
    foreignKeys: {
      session_user_id_user_user_id_fk: {
        name: "session_user_id_user_user_id_fk",
        columns: ["user_id"],
        referencedTable: "user",
        referencedColumns: ["user_id"],
        onDelete: "NO ACTION",
      },
    },
    primaryKey: ["id"],
    uniqueConstraints: {},
    columns: [
      {
        name: "expires_at",
        type: "datetime",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "user_id",
        type: "link",
        link: { table: "user" },
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
    ],
  },
  {
    name: "user",
    checkConstraints: {},
    foreignKeys: {},
    primaryKey: ["user_id"],
    uniqueConstraints: {},
    columns: [
      {
        name: "created_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "email",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "password",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "updated_at",
        type: "datetime",
        notNull: false,
        unique: false,
        defaultValue: null,
        comment: "",
      },
      {
        name: "user_id",
        type: "text",
        notNull: true,
        unique: true,
        defaultValue: null,
        comment: "",
      },
      {
        name: "username",
        type: "text",
        notNull: true,
        unique: false,
        defaultValue: null,
        comment: "",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type DatabaseSchema = {
  session: SessionRecord;
  user: UserRecord;
};

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        apiKey: process.env.XATA_API_KEY,
        databaseURL: process.env.XATA_HTTPS_URL,

        // Use deploy preview branch if available, otherwise use branch from environment
        branch:
          getDeployPreviewBranch(process.env) ??
          process.env.XATA_BRANCH ??
          "main",
        ...options,
      },
      tables
    );
  }
}


export type Session = InferredTypes["session"];
export type SessionRecord = Session & XataRecord;

export type User = InferredTypes["user"];
export type UserRecord = User & XataRecord;

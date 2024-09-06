declare module "joi-objectid" {
  import { Extension } from "joi";

  function joiObjectId(joi: any): Extension;

  export = joiObjectId;
}

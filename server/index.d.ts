// src/index.d.ts
import * as express from "express";

interface Locals {
  message?: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    myField?: Locals
  }
  interface Response {
    locals?: Locals
  }
}
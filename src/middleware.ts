import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(request: NextRequest) {
  console.log('Headers:', request.headers);
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/",
  "/teachers",
  "/students",
  "/teachers/formAddTeacher",
  "/teachers/formEditTeacher",
  "/students/formAddStudent",
  "/students/class10",
  "/students/class11",
  "/students/class12",
]);

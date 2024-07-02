'use client'

import FormEdit from "@/components/FormEdit/FormEdit";
import { useParams } from "next/navigation";

export default function FormEditTeacher() {

  const params = useParams()
  return(
    <div>
      <FormEdit content="teachers" id={params.id}/>
    </div>
  )
}
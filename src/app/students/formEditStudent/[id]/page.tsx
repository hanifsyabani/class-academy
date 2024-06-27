'use client'

import FormEdit from "@/components/FormEdit/FormEdit";
import { useParams } from "next/navigation";

export default function FormEditStudent() {
  const params = useParams();

  return(
    <div>
      <FormEdit id={params.id} content="students"/>
    </div>
  )
}
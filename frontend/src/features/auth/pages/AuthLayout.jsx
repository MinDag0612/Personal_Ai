import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../../../shared/components/Header";

export default function AuthLayout() {
  return (
    <div className="landing-shell">
        <Header showNav={false} />

        <Outlet />
    </div>
  )
}

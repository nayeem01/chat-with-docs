import React from "react";
import { useGlobalContext } from "../Context/store";

export default function Navbar() {
  const { llmToggle, setLLM } = useGlobalContext();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">Research Buddy</div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <select className="select select-accent w-full max-w-xs mr-10">
                  <option disabled selected>
                    LLM Model
                  </option>
                  <option>Auto</option>
                  <option>Dark mode</option>
                  <option>Light mode</option>
                </select>
              </li>
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={false}
                      onClick={() => setLLM(!llmToggle)}
                    />
                  </label>
                </div>
              </li>

              <li itemType="file" className="btn btn-outline btn-accent">
                Upload PDFs
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
    </div>
  );
}

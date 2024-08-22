import React, { useState } from "react";

export default function Navbar() {
  const [selectedValue, setSelectedValue] = useState("LLM Model");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
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
          <div className="flex-1 px-2 mx-2">Chat with Docs</div>

          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <select
                  id="dropdown"
                  className="select select-accent w-full max-w-xs mr-10"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option disabled value="LLM Model">
                    LLM Model
                  </option>
                  <option value="model1">Model 1</option>
                  <option value="model2">Model 2</option>
                  {/* Add more options as needed */}
                </select>
              </li>
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className="toggle toggle-accent"
                      checked={false} // Use state if needed
                      onChange={(e) => {
                        /* Handle checkbox change */
                      }}
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

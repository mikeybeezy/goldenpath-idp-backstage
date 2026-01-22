
Kill orphan processes

lsof -i :3000 -i :7007 -t | xargs kill -9 && cd /Users/mikesablaze/Documents/relaunch/goldenpath-idp-backstage && yarn start



This error (TypeError: Failed to fetch, Failed to load entity kinds) confirms the frontend is loading (LocalStorage issue resolved), but it cannot talk to the backend.

Why? Looking at your yarn start history, the last successful start was 3m30s ago, BUT we saw earlier that it was defaulting to Node 18 and crashing with ERR_DLOPEN_FAILED.

Diagnosis: The Frontend (port 3000) started fine, but the Backend (port 7007) crashed because it tried to use Node 18 binaries with the Node 18 runner, while the modules were compiled for Node 22 (or vice versa).

Required Action: We must restart the server explicitly forcing Node 22, because that is what your environment expects now that we've enabled guest access and rebuilt binaries.

Command to Run:

lsof -i :3000 -i :7007 -t | xargs kill -9 && \
source ~/.nvm/nvm.sh && \
nvm use 22 && \
yarn start




The "Load Template Directory" option is part of a specific developer tool called the Template Editor. It is not on the standard "Create" page.

You can interpret this as a "hidden" page for developers.

How to get there:
Direct Link (Easiest): 👉 http://localhost:3000/create/edit
Via UI:
Go to the Create page (/create).
Look for a vertical ellipsis (⋮) or "three dots" menu button in the top-right corner of the page header.
Click it and select "Template Editor".
Once you are on that page, "Load Template Directory" will be the first tab on the left side of the screen.




We have the frontend aand the back end 

FRront end 
/Users/mikesablaze/Documents/relaunch/goldenpath-idp-backstage/packages/app

Backend 
/Users/mikesablaze/Documents/relaunch/goldenpath-idp-backstage/packages/backend
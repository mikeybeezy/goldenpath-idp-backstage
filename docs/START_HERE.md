
app-config.yaml: Main configuration file for the app. See Configuration for more information.
catalog-info.yaml: Catalog Entities descriptors. See Descriptor Format of Catalog Entities to get started.
package.json: Root package.json for the project. Note: Be sure that you don't add any npm dependencies here as they probably should be installed in the intended workspace rather than in the root.
packages/: Yarn workspaces, everything here is going to be a separate package, managed by Yarn.
packages/app/: A fully functioning Backstage frontend app that acts as a good starting point for you to get to know Backstage.
packages/backend/: We include a backend that helps power features such as Authentication, Software Catalog, Software Templates and TechDocs amongst other things.

TEST 
gitghub app id: Ov23ct91Tk1kgeN0z9Y2
gitghub app secret: 9ef3327a93fe70b56c6ce26a8e5a820292b04c45

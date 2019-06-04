enablePlugins(ScalaJSPlugin)
enablePlugins(GhpagesPlugin)

name            := "hyperlambda"
version         := "0.1"
scalaVersion    := "2.12.8"
git.remoteRepo  := "https://github.com/yuxuanchiadm/hyperlambda.git"
ghpagesNoJekyll := true

resolvers += Resolver.mavenLocal

libraryDependencies += "org.lamcalcj" %%% "lamcalcj-compiler" % "1.4.0"
libraryDependencies += "org.lamcalcj" %%% "lamcalcj-pretty-print" % "1.4.0"
libraryDependencies += "org.lamcalcj" %%% "lamcalcj-reducer" % "1.4.0"

(makeSite / mappings) ++= Seq(
  (Compile / fullOptJS).value.data -> "hyperlambda.js"
)

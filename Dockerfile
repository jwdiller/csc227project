FROM scratch
CMD "echo" "Building Dockerfile from Scratch"

MAINTAINER james_diller
CMD "echo" "Maintainer : James Diller"

ADD https://github.com/jwdiller/csc227project.git
CMD "echo" "github source added"
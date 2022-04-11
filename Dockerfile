FROM emscripten/emsdk

ENV PYTHONUNBUFFERED 1

RUN apt-get update

RUN apt-get install -y --no-install-recommends \
    libgeos-dev ed \
    automake autoconf libtool

RUN rm -rf /var/lib/apt/lists/*
RUN mkdir code

WORKDIR /code

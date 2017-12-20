#!/usr/bin/env bash

DIR='/tmp/data/mongodb'
LOGFILE='/var/log/mongodb/mongodb.log'
LOGDIR="$(dirname ${LOGFILE})"

if [[ ! -d "${DIR}" ]];
then
	mkdir -p "${DIR}"
	chmod 774 "${DIR}"
	chgrp mongodb "${DIR}"
fi

if [[ ! -d "${LOGDIR}" ]];
then
	mkdir -p "${LOGDIR}"
	chmod 774 "${LOGDIR}"
	chgrp mongodb "${LOGDIR}"
fi
touch "${LOGFILE}"

# mongod --fork -f ~/mongo/mongodb.cfg
clear
echo "Starting mongodb daemon"
mongod -f ~/mongo/mongodb.cfg &
PID=$!
echo -e "==================================\n"
tail -f "${LOGFILE}"
kill ${PID}

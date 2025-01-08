# auther: https://github.com/karpikpl/tests-with-docker-compose/blob/master/test.sh
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
DOCKER_COMPOSE_PATH="../docker-compose.dev.yml"
cleanup () {
  docker-compose -p ci kill
  docker-compose -p ci rm -f
}
trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"' HUP INT QUIT PIPE TERM
docker-compose -p ci -f ${DOCKER_COMPOSE_PATH} build && docker-compose -p ci -f ${DOCKER_COMPOSE_PATH} up -d
if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed${NC}\n"
  exit -1
fi
TEST_EXIT_CODE=`docker wait ci_tests_1`
docker logs ci_tests_1
if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
  docker logs ci_seed_1
  docker logs ci_db_1
  docker logs ci_fun_1
  printf "${RED}Tests Failed${NC} - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed${NC}\n"
fi
cleanup
exit $TEST_EXIT_CODE

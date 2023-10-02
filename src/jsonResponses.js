const users = {};

const respond = (request, response, content, code) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondWithoutContent = (request, response, code) => {
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end();
};

const getNotFound = (request, response) => {
  const content = {
    message: "couldn't find it :/",
    id: 'notFound',
  };

  return respond(request, response, content, 404);
};

const getUsers = (request, response) => respond(request, response, { users }, 200);

const getUsersMeta = (request, response) => respondWithoutContent(request, response, 200);

const getNotFoundMeta = (request, response) => respondWithoutContent(request, response, 404);

const addUser = (request, response, params) => {
  if (!params.name || !params.age) {
    const message = {
      id: 'addUserMissingParams',
      message: 'Name and age are both required.',
    };
    return respond(request, response, message, 400);
  }

  if (!users[params.name]) {
    users[params.name] = {
      name: params.name,
      age: params.age,
    };
    return respond(request, response, { message: 'Created Successfully' }, 201);
  }

  users[params.name].age = params.age;
  return respondWithoutContent(request, response, 204);
};

module.exports = {
  getUsers,
  getUsersMeta,
  getNotFound,
  getNotFoundMeta,
  addUser,
};

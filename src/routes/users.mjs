import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

const router = Router();

router.get(
  `/api/users`,
  query("filter")
    .isString()
    .notEmpty()
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be greater than 3 charecter"),
  (request, response) => {
    console.log(request.session);
    console.log(request.session.id);

    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
    // console.log(request["express-validator#contexts"]);
    const result = validationResult(request);
    console.log(result);
    const {
      query: { filter, value },
    } = request;

    // if (!filter && !value) return response.sendStatus(mockUsers);

    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );

    return response.send(mockUsers);
  }
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);

    console.log(result);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    console.log(data);

    // const { body } = request;
    const newUsers = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };

    mockUsers.push(newUsers);

    return response.status(201).send(newUsers);
  }
);

router.get(`/api/users/:id`, resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return response.sendStatus(404);

  return response.send(findUser);
});

//put request
router.put(`/api/users/:id`, resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };

  return response.sendStatus(200);
});

//patch request
router.patch(`/api/users/:id`, resolveIndexByUserId, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

//delete request
router.delete(`/api/users/:id`, resolveIndexByUserId, (request, response) => {
  const { findUserIndex } = request;
  mockUsers.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

export default router;

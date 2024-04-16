import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookies);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);

  if (request.signedCookies.hello && request.signedCookies.hello === "world")
    return response.send([{ id: 123, name: "Chicken Breast", price: 12.99 }]);

  return response.send({ msg: "Sorry. You need the right cookies" });
});

export default router;

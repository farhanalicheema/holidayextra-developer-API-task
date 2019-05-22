const apiHelpers = require("../helpers/apiHelpers");
describe("Tests For User API", () => {
  
  let testUserId = '';
  test("Create New User", done => {
    apiHelpers.makeGenericApiCall(
      {
        email: "test@test.com",
        givenName: "apple",
        familyName: "seed"
      },
      "POST",
      "/api/users",
      (code, err, user) => {
        testUserId = user.id;
        console.log(`User created with id ${testUserId}`)
        expect(code).toBe(201);
        done();
      }
    );
  });

  

  test(`Update User`, done => {
    apiHelpers.makeGenericApiCall(
      {
        id: testUserId,
        email: "test@test.com",
        givenName: "appleupdated",
        familyName: "seed"
      },
      "PUT",
      `/api/users`,
      (code, err, user) => {
        console.log(`User updated with id ${testUserId}`)
        expect(code).toBe(200);
        done();
      }
    );
  });

  test("Get User Details ", done => {
    apiHelpers.makeGenericApiCall({},
      "GET",
      `/api/users/${testUserId}`,
      (code, err, user) => {
        console.log(`User fetched with id ${testUserId}`)
        expect(code).toBe(200);
        expect(user.givenName).toBe("appleupdated");
        done();
      }
    );
  });

  test("Get All Users", done => {
    apiHelpers.makeGenericApiCall({},
      "GET",
      `/api/users`,
      (code, err, user) => {
        expect(user.length).toBeGreaterThanOrEqual(1);
        done();
      }
    );
  });



  test("Delete User ", done => {
    apiHelpers.makeGenericApiCall(
      {
        id: testUserId,
        email: "test@test.com",
        givenName: "appleupdated",
        familyName: "seed"
      },
      "DELETE",
      `/api/users/${testUserId}`,
      (code, err, user) => {
        console.log(`User deleted with id ${testUserId}`)
        expect(code).toBe(200);
        done();
      }
    );
  });

  test("Verify User Deleted ", done => {
    apiHelpers.makeGenericApiCall({},
      "GET",
      `/api/users/${testUserId}`,
      (code, err, user) => {
        console.log(`Verifying deleted user with id ${testUserId}`)
        expect(code).toBe(404);
        done();
      }
    );
  });
  
  
});

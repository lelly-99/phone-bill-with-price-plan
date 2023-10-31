import assert from "assert";
import registrationNumbers from "../factory-function/registration.js";

describe("Registrations Factory functions", function () {
  
  it("should not accept duplicates and return a duplicate error message", function () {
    var regNumbers = registrationNumbers();
    
    regNumbers.addRegistration("CA 1234");
    regNumbers.addRegistration("CA 1234");
    
    assert.equal(regNumbers.existReg(), 'Registration number alredy exists'); 
  });
  
    it("should return an error message for an empty registration", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.errorMessage(""), "Please enter a registration number");
    });
    it("should return an error message for an invalid registration", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.errorMessage("123 ABC"), "Please enter a valid registration number");
    });
    it("should return an error message for a registration from a town not available", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.errorMessage("ZA 123"), "Please enter a registration numbers for Cape Town, Bellville, Paarl or Stellenbosch");
    });
    
    it("should return the town code for Cape Town", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.fromWhere("Cape Town"), "CA");
    });
    it("should return the town code for Bellville", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.fromWhere("Bellville"), "CY");
    });
    it("should return the town code for Paarl", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.fromWhere("Paarl"), "CJ");
    });
    it("should return the town code for Stellenbosch", function () {
      var regNumbers = registrationNumbers();
      assert.equal(regNumbers.fromWhere("Stellenbosch"), "CL");
    });
      it("should return the town code for Cape Town", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.fromWhere("Cape Town"), "CA");
      });
  
      it("should return the town code for Bellville", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.fromWhere("Bellville"), "CY");
      });
  
      it("should return the town code for Paarl", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.fromWhere("Paarl"), "CJ");
      });
  
      it("should return the town code for Stellenbosch", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.fromWhere("Stellenbosch"), "CL");
      });
      it("should return the town code for a registration from Cape Town", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.getCode("CA 123"), "CA");
      });
  
      it("should return the town code for a registration from Bellville", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.getCode("CY 456"), "CY");
      });
  
      it("should return the town code for a registration from Paarl", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.getCode("CJ 789"), "CJ");
      });
  
      it("should return the town code for a registration from Stellenbosch", function () {
        var regNumbers = registrationNumbers();
        assert.equal(regNumbers.getCode("CL 012"), "CL");
      });
  })

  
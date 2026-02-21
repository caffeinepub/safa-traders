import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type ProfileType = {
    #dealer;
    #company;
  };

  public type UserProfile = {
    profileType : ProfileType;
    name : Text;
    // Dealer-specific fields
    dealerLocation : ?Text;
    dealerContactNumber : ?Text;
    // Company-specific fields
    companyAddress : ?Text;
    companyRegistrationNumber : ?Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Get the caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Get another user's profile (admin only, or own profile)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Save the caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Dealer-specific convenience function to save dealer profile
  public shared ({ caller }) func saveDealerProfile(name : Text, location : Text, contactNumber : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated dealers can save profiles");
    };
    let profile : UserProfile = {
      profileType = #dealer;
      name = name;
      dealerLocation = ?location;
      dealerContactNumber = ?contactNumber;
      companyAddress = null;
      companyRegistrationNumber = null;
    };
    userProfiles.add(caller, profile);
  };

  // Get dealer profile (authenticated users only)
  public query ({ caller }) func getDealerProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Company-specific convenience function to save company profile
  public shared ({ caller }) func saveCompanyProfile(name : Text, address : Text, registrationNumber : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated companies can save profiles");
    };
    let profile : UserProfile = {
      profileType = #company;
      name = name;
      dealerLocation = null;
      dealerContactNumber = null;
      companyAddress = ?address;
      companyRegistrationNumber = ?registrationNumber;
    };
    userProfiles.add(caller, profile);
  };

  // Get company profile (authenticated users only)
  public query ({ caller }) func getCompanyProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    userProfiles.get(caller);
  };

  // Quotation Request functionality
  public type SizeInfo = {
    length : Nat;
    width : Nat;
    height : Nat;
    units : Text;
  };

  public type QuotationRequest = {
    companyName : Text;
    contactPerson : Text;
    phoneNumber : Text;
    email : Text;
    siteType : Text;
    siteAddress : Text;
    sizeInfo : [SizeInfo];
    additionalNotes : Text;
    timestamp : Time.Time;
    requester : Principal;
  };

  let quotationRequests = List.empty<QuotationRequest>();

  // Add a new quotation request
  public shared ({ caller }) func addQuotationRequest(
    companyName : Text,
    contactPerson : Text,
    phoneNumber : Text,
    email : Text,
    siteType : Text,
    siteAddress : Text,
    sizeInfo : [SizeInfo],
    additionalNotes : Text
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can submit requests");
    };

    let request : QuotationRequest = {
      companyName;
      contactPerson;
      phoneNumber;
      email;
      siteType;
      siteAddress;
      sizeInfo;
      additionalNotes;
      timestamp = Time.now();
      requester = caller;
    };

    quotationRequests.add(request);
  };

  // Get all quotation requests (admin only)
  public query ({ caller }) func getAllQuotationRequests() : async [QuotationRequest] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can view all requests");
    };
    quotationRequests.reverseValues().toArray();
  };

  // Get requests submitted by specific requester
  public query ({ caller }) func getRequestsByRequester(requester : Principal) : async [QuotationRequest] {
    // Users can only view their own requests, admins can view any user's requests
    if (caller != requester and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own requests");
    };
    
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only authenticated users can view requests");
    };

    let filteredRequests = quotationRequests.filter(
      func(request) { request.requester == requester }
    );
    filteredRequests.reverseValues().toArray();
  };
};

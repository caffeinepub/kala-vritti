import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type SubmissionId = Nat;
  type Timestamp = Int;

  type Submission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    city : ?Text;
    timestamp : Timestamp;
  };

  module Submission {
    public func compareByTimestamp(a : Submission, b : Submission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let submissions = Map.empty<SubmissionId, Submission>();
  var nextId = 0;

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text, city : ?Text) : async SubmissionId {
    let timestamp = Time.now();
    let id = nextId;
    nextId += 1;

    let submission : Submission = {
      name;
      email;
      phone;
      message;
      city;
      timestamp;
    };

    submissions.add(id, submission);
    id;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray().sort(Submission.compareByTimestamp);
  };
};

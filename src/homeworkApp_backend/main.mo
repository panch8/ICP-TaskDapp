
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import List "mo:base/List";





  actor {

 type Time = Int;
 type Pattern = Text.Pattern;
 public type Homework = {
  title: Text;
  description:Text;
  dueDate: Time.Time;
  completed: Bool;
 };

  // var homeworkDiary = Buffer.Buffer<Homework>(2);

  
  stable var homeworkDiary: List.List<Homework> = List.nil<Homework>();

  

  public func addHomework(hTitle: Text, hDescription: Text, hDueDate: Nat, hCompleted: Bool): async Nat{ 
    
    let newHomework: Homework = {
      title = hTitle;
      description = hDescription;
      dueDate = hDueDate;
      completed = hCompleted;
    };

    homeworkDiary := List.push<Homework>(newHomework, homeworkDiary);
    var i= List.size<Homework>(homeworkDiary);
    return i-1;
  };
  
 

  public func getHomework(index: Nat): async Result.Result<Homework, Text>{
  
    var hW: ?Homework = List.get<Homework>(homeworkDiary,index);
    switch(hW) {
      case(?Homework) return #ok Homework; 
      case(null) {#err "Incorrect homework index not reachable"  };
    };

  };

  public func updateHomework (index: Nat, hTitle: Text, hDescription: Text, hDueDate: Nat, hCompleted: Bool): async Result.Result<(), Text> {

       let newHomework: Homework = {
      title = hTitle;
      description = hDescription;
      dueDate = hDueDate;
      completed = hCompleted;
    };


      let s: Nat = List.size(homeworkDiary);
      if(index < s){
        let homeworkDiaryArr = List.toArray(homeworkDiary);
        let homeworkBuffer : Buffer.Buffer<Homework> = Buffer.fromArray(homeworkDiaryArr);
         homeworkBuffer.put(index, newHomework);
        let homeworkArrFBuff = Buffer.toArray<Homework>(homeworkBuffer);

        homeworkDiary := List.fromArray(homeworkArrFBuff);
        return #ok ()}
        else { return #err ("Not valid index")};
 
  };

  public func markAsCompleted (index: Nat): async Result.Result<(),Text>{
       let s: Nat = List.size( homeworkDiary);
      if(index < s){
        let hToUpdate = List.get(homeworkDiary,index);
        switch(hToUpdate) {
          case(null) {#err("dont know exactly this exception")  };
          case(?hToUpdate) {
          let hToPut = { 
            completed = true; 
            description = hToUpdate.description; 
            title = hToUpdate.title; 
            dueDate = hToUpdate.dueDate 
            };
        // transform list to buffer and back
        let homeworkDiaryArr = List.toArray(homeworkDiary);
        let homeworkBuffer : Buffer.Buffer<Homework> = Buffer.fromArray(homeworkDiaryArr);
        //bufferput
         homeworkBuffer.put(index, hToPut);
        let homeworkArrFBuff = Buffer.toArray<Homework>(homeworkBuffer);

        // back to list
        homeworkDiary := List.fromArray(homeworkArrFBuff);
     return #ok ()};
           };
        }
        else { return #err ("Not valid IIIIID")};
  };

  public func deleteHomework(index: Nat): async Result.Result<Homework, Text>{
    let s: Nat = List.size(homeworkDiary);
    if(index < s){
        // transform list to buffer and back
        let homeworkDiaryArr = List.toArray(homeworkDiary);
        let homeworkBuffer : Buffer.Buffer<Homework> = Buffer.fromArray(homeworkDiaryArr);
      let deleted: Homework = homeworkBuffer.remove(index);
      let homeworkArrFBuff = Buffer.toArray<Homework>(homeworkBuffer);

      // back to list
      homeworkDiary := List.fromArray(homeworkArrFBuff);

      return #ok (deleted)
    }
    else #err("No deletion bad ID");
  };

  public query func getAllHomework(): async [Homework]{
    List.toArray(homeworkDiary);
  };
 
  public query func getPendingHomework(): async [Homework]{
    let homeworkDiaryArr =  List.toArray(homeworkDiary); 
     
     func _checkIncomplete(el: Homework):Bool{
      
        switch(el.completed){ 
          case(false) true ;
          case(true) false;
         };
        
      };

    let incompleteArr = Array.filter<Homework>(homeworkDiaryArr, _checkIncomplete);
    
    incompleteArr;
};


  public query func searchHomework(searchTerm:Text): async [Homework]{
    let homeworkDiaryArr =  List.toArray(homeworkDiary);
    func _checkSearchTermTit(x: Homework):Bool{
    let p: Pattern = #text (searchTerm);
      switch(Text.contains(x.title, p)){
        case(false)Text.contains(x.description, p);
        case(true)true;
        } 
      };
      Array.filter<Homework>(homeworkDiaryArr,_checkSearchTermTit);
    };
  };
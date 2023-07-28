import React, { Component } from "react";
import { CustomButton } from "./button";
import { InputField } from "./formcomponent";
import { createdOn, onlyTimeFromDate } from "../utils/basic";
import { addComment, displayComment } from "./timeline.ctrl";

let CommentData = [
  {
    commentday: "Today",
    commentname: "Action",
    commenttime: "44 min ago",
  },
  {
    commentday: "Yesterday",
    commentname: "Added the order",
    commenttime: "2 min ago",
  },
];

export class TimelineComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_box: "",
      comments: [],
      total_comments: 0,
      filterd_comments: [],
    };
  }
  async componentDidMount() {
    let { success, data } = await displayComment(
      "timeline/order/" + this.props.order_id,
      ""
    );
    if (success) {
      this.setState({
        comments: data.results,
        total_comments: data.count,
      });
      this.gropComments();
    }
  }
  gropComments() {
    this.setState({
      filterd_comments: [],
    });
    let sort_data =[];
    sort_data = this.state.comments.sort(
      (a, b) => Date.parse(b.created_on) - Date.parse(a.created_on)
    );
    sort_data = this.state.comments;
    let groupByCategory = sort_data.reduce((group, product) => {
      group[createdOn(product.created_on)] =
        group[createdOn(product.created_on)] ?? [];
      group[createdOn(product.created_on)].push(product);
      return group;
    }, {});

    console.log("group", groupByCategory);
    this.setState({
      filterd_comments: Object.values(groupByCategory),
    });
  }
  setCommentChangeHandler(value) {
    this.setState({
      comment_box: value,
    });
  }
  saveCommentData = async () => {
    let res = await addComment(`timeline/order/${this.props.order_id}`, {
      comment: this.state.comment_box,
      model: "order",
      res_id: this.props.order_id,
      parent_id: null,
    });
    if (res.success) {
      this.setState((prevState) => ({
        comments: [...prevState.comments, res.data],
        total_comments: this.state.total_comments + 1,
        comment_box: "",
      }));
      this.gropComments();
    }
  };
  saveReply = async (data) => {
    let res = await addComment(`timeline/order/${this.props.order_id}`, {
      comment: data.comment,
      model: "order",
      res_id: this.props.order_id,
      parent_id: data.parent_id,
    });
    if(res.status){
    let list = this.state.comments.map(
      (comments) =>
        comments.id === data.parent_id && [
          ...this.state.comments,
          (comments.child_ids = [...comments.child_ids, res.data]),
        ]
    );
    list = list.filter((item) => item !== false);
    this.setState({ comments: list[0] });
    // this.gropComments();
    }
  };
  render() {
    return (
      <>
        {console.log("filter.........", this.state.filterd_comments)}
        <div className="showroom-timeline">
          <div className="timeline-header">
            <h4>TimeLine</h4>
            <hr className="timeline-indicator" />
          </div>
          <div className="timeline-body">
            <div className="comment-section d-flex align-items-center">
              <h4>D</h4>
              <div className="d-flex add-comment-field">
                <InputField
                  type="text"
                  value={this.state.comment_box}
                  name="comment"
                  id="name"
                  className="custom-input"
                  placeholder="Leave a comment"
                  onChange={(e) => this.setCommentChangeHandler(e.target.value)}
                />
                <CustomButton
                  name="Send"
                  className="custom-button"
                  id="send"
                  onClick={() => {
                    this.saveCommentData();
                  }}
                />
              </div>
            </div>
            <div className="all-comment">
              {this.state.total_comments > 0 &&
                this.state.filterd_comments.length > 0 &&
                this.state.filterd_comments.map(
                  (comment) =>
                    comment[0].parent_id === null  && (
                      <React.Fragment key={comment[0].id}>
                        <div className="comment-list pb-0">
                        <span className="comment-day">{createdOn(comment[0].created_on)}</span>
                        {comment.sort((a,b)=> createdOn(a.created_on)-createdOn(b.created_on)).map((data) => (
                          <div className="comment-list" key={data.id}>
                            <ReplyComment
                              data={data}
                              order_id={this.props.order_id}
                              onSave={this.saveReply.bind(this)}
                              onFilter={this.gropComments.bind(this)}
                              key={data.id}
                            />
                          </div>
                        ))}
                        </div>
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export const Timeline = (props) => {
  return (
    <div className="showroom-timeline">
      <div className="timeline-header">
        <h4>{props.timelinetitle} </h4>
        <hr className="timeline-indicator" />
      </div>
      <div className="timeline-body">
        <div className="comment-section d-flex align-items-center">
          <h4>D</h4>
          <div className="d-flex add-comment-field">
            <InputField
              type="text"
              name="comment"
              id="name"
              className="custom-input"
              placeholder="Leave a comment"
            />
            <CustomButton name="Send" className="custom-button" id="send" />
          </div>
        </div>
        <div className="all-comment">
          {CommentData.map((comment, idx) => (
            <CommentList
              key={idx}
              commentday={comment.commentday}
              commentname={comment.commentname}
              commenttime={comment.commenttime}
            />
          ))}
          <ReplyCommentDesign />
        </div>
      </div>
    </div>
  );
};
export class ReplyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false,
      replyComment: "",
      replyCommentData: [],
    };
  }
  toggle() {
    this.setState({
      isDisplay: !this.state.isDisplay,
    });
  }
  setReplyCommentHandler(value) {
    this.setState({
      replyComment: value,
    });
  }
  saveReplyCommentData = async (reply_parent) => {
    this.props.onSave({
      parent_id: reply_parent,
      comment: this.state.replyComment,
    });
    this.props.onFilter();
    this.setState({
      replyComment: "",
    });
  };
  render() {
    return (
      <div className="order-comments">
        <div className="reply-comment">
          {/* {createdOn(this.props.data.created_on)}
          <hr className="timeline-indicator" /> */}
          <div className="reply-detail comment-section d-flex align-items-start">
            <h4>D</h4>
            <div className="user-reply-detail">
              <div className="reply-header d-flex align-items-center justify-content-between">
                <h2 className="common-text mb-0">
                  {this.props.data.created_by !== null &&
                    this.props.data.created_by.first_name +
                      " " +
                      this.props.data.created_by.last_name}
                  <span> {onlyTimeFromDate(this.props.data.created_on)} </span>
                </h2>
                <span
                  className="common-text blue-link"
                  onClick={this.toggle.bind(this)}
                >
                  {this.props.data.child_ids.length > 0 &&
                    this.props.data.child_ids.length}{" "}
                  Reply
                </span>
              </div>
              <p className="common-text mb-0 mt-1">{this.props.data.comment}</p>
            </div>
          </div>
        </div>
        {this.state.isDisplay && (
          <div className="replied-box">
            {this.props.data.child_ids.length > 0 &&
              this.props.data.child_ids.sort((a, b) =>
              b.id > a.id ? 1 : -1
            ).map((sub) => (
                <div className="reply-comment border-0" key={sub.id}>
                  <div className="reply-detail comment-section d-flex align-items-start">
                    <h4>D</h4>
                    <div className="user-reply-detail">
                      <div className="reply-header d-flex align-items-center justify-content-between">
                        <h2 className="common-text mb-0">
                          {sub.created_by !== null &&
                            sub.created_by.first_name +
                              " " +
                              sub.created_by.last_name}
                          <span>{onlyTimeFromDate(sub.created_on)}</span>
                        </h2>
                      </div>
                      <p className="common-text mb-0 mt-1">{sub.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="d-flex add-comment-field comment-section p-3 position-relative">
              <InputField
                type="text"
                name="replyComment"
                id="name"
                onChange={(e) => this.setReplyCommentHandler(e.target.value)}
                value={this.state.replyComment}
                className="custom-input"
                placeholder="Leave a comment"
              />
              <CustomButton
                name="Reply"
                className="custom-button"
                id="send"
                onClick={() => {
                  this.saveReplyCommentData(this.props.data.id);
                }}
              />
            </div>
            <span
              className="collapse-item text-center d-block"
              onClick={this.toggle.bind(this)}
            >
              Collapse
            </span>
          </div>
        )}
      </div>
    );
  }
}
// backup last change
// export class ReplyComment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isDisplay: false,
//       replyComment: "",
//       replyCommentData: [],
//     };
//   }
//   toggle() {
//     this.setState({
//       isDisplay: !this.state.isDisplay,
//     });
//   }
//   setReplyCommentHandler(value) {
//     this.setState({
//       replyComment: value,
//     });
//   }
//   saveReplyCommentData = async (reply_parent) => {
//     this.props.onSave({
//       parent_id: reply_parent,
//       comment: this.state.replyComment,
//     });
//     this.setState({
//       replyComment: "",
//     });
//   };
//   render() {
//     return (
//       <div className="order-comments">
//         <div className="reply-comment">
//           {createdOn(this.props.data.created_on)}
//           <hr className="timeline-indicator" />
//           <div className="reply-detail comment-section d-flex align-items-start">
//             <h4>D</h4>
//             <div className="user-reply-detail">
//               <div className="reply-header d-flex align-items-center justify-content-between">
//                 <h2 className="common-text mb-0">
//                   {this.props.data.created_by !== null &&
//                     this.props.data.created_by.first_name +
//                       " " +
//                       this.props.data.created_by.last_name}
//                   <span> {onlyTimeFromDate(this.props.data.created_on)} </span>
//                 </h2>
//                 <span
//                   className="common-text blue-link"
//                   onClick={this.toggle.bind(this)}
//                 >
//                   {this.props.data.child_ids.length > 0 &&
//                     this.props.data.child_ids.length}{" "}
//                   Reply
//                 </span>
//               </div>
//               <p className="common-text mb-0 mt-1">{this.props.data.comment}</p>
//             </div>
//           </div>
//         </div>
//         {this.state.isDisplay && (
//           <div className="replied-box">
//             {this.props.data.child_ids.length > 0 &&
//               this.props.data.child_ids.map((sub) => (
//                 <div className="reply-comment border-0" key={sub.id}>
//                   <div className="reply-detail comment-section d-flex align-items-start">
//                     <h4>D</h4>
//                     <div className="user-reply-detail">
//                       <div className="reply-header d-flex align-items-center justify-content-between">
//                         <h2 className="common-text mb-0">
//                           {sub.created_by !== null &&
//                             sub.created_by.first_name +
//                               " " +
//                               sub.created_by.last_name}
//                           <span>{onlyTimeFromDate(sub.created_on)}</span>
//                         </h2>
//                       </div>
//                       <p className="common-text mb-0 mt-1">{sub.comment}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             <div className="d-flex add-comment-field comment-section p-3 position-relative">
//               <InputField
//                 type="text"
//                 name="replyComment"
//                 id="name"
//                 onChange={(e) => this.setReplyCommentHandler(e.target.value)}
//                 value={this.state.replyComment}
//                 className="custom-input"
//                 placeholder="Leave a comment"
//               />
//               <CustomButton
//                 name="Reply"
//                 className="custom-button"
//                 id="send"
//                 onClick={() => {
//                   this.saveReplyCommentData(this.props.data.id);
//                 }}
//               />
//             </div>
//             <span
//               className="collapse-item text-center d-block"
//               onClick={this.toggle.bind(this)}
//             >
//               Collapse
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
export function CommentList({ commentday, commentname, commenttime }) {
  return (
    <div className="comment-list">
      <span className="comment-day">{commentday}</span>
      <div className="comment-detail d-flex align-items-center justify-content-between flex-wrap">
        <h4>{commentname}</h4>
        <span>{commenttime}</span>
      </div>
    </div>
  );
}

export function ReplyCommentDesign({}) {
  return (
    <div className="order-comments">
      <div className="reply-comment">
        <div className="reply-detail comment-section d-flex align-items-start">
          <h4>D</h4>
          <div className="user-reply-detail">
            <div className="reply-header d-flex align-items-center justify-content-between">
              <h2 className="common-text mb-0">
                Oliver Greave <span>32 min ago</span>
              </h2>
              <span className="common-text blue-link">Reply</span>
            </div>
            <p className="common-text mb-0 mt-1">
              Long message dolor leo, molestie id metus vitae, egestas gravida
              quam. Donec dolor leo, molestie id metus vitae, egestas gravida
              quam.
            </p>
          </div>
        </div>
      </div>
      <div className="replied-box">
        <div className="reply-comment border-0">
          <div className="reply-detail comment-section d-flex align-items-start">
            <h4>D</h4>
            <div className="user-reply-detail">
              <div className="reply-header d-flex align-items-center justify-content-between">
                <h2 className="common-text mb-0">
                  Oliver Greave <span>32 min ago</span>
                </h2>
              </div>
              <p className="common-text mb-0 mt-1">
                Long message dolor leo, molestie id metus vitae, egestas gravida
                quam. Donec dolor leo, molestie id metus vitae, egestas gravida
                quam.
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex add-comment-field comment-section p-3 position-relative">
          <InputField
            type="text"
            name="comment"
            id="name"
            className="custom-input"
            placeholder="Leave a comment"
          />
          <CustomButton name="Send" className="custom-button" id="send" />
        </div>
        <span className="collapse-item text-center d-block">Collapse</span>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import DropDown from "../assets/images/icon_dropdown.svg";
import { AttributeButton, CustomButton } from "../component/button";
import { Modal, Accordion } from "react-bootstrap";
import IconAddTree from "../assets/images/icon_add_tree.svg";
import { Alert } from "react-bootstrap";
import InfoIcon from "../assets/images/Alert-info.svg";
import DefaultThumbnail from "../assets/images/Icon_default_thumbnail.svg";
import OrderImage from "../assets/images/Icon_default_thumbnail.svg";
import CloseChip from "../assets/images/icon_close.svg";
import IconUploadImages from "../assets/images/Icon_Upload_image.svg";

// Custom DropDown
export const CustomDropdown = (props) => {
  let [toggle, setToggle] = useState(false);

  const onTdClick = (item) => {
    props.onClick(item);
    setToggle(!toggle);
  }

  return (
    <div className="showroom-dropdown position-relative">
      <div className="dropdown-button c-pointer" onClick={() => {setToggle(!toggle);}}>
        <span className="dropdown-value">
          {props.filter}
          <img src={DropDown} className="dropdown-arrow" alt="Icon" />
        </span>
      </div>
      <ul className={`${toggle ? `d-block` : "d-none"}`}>
        {props.list.map((item, idx) => (          
          <DropdownList key={idx} list={item}  onClick={() => onTdClick(item)} />          
        ))}
      </ul>
    </div>
  );
};

export function DropdownList({ list, onClick }) {
  return <li className="showroom-dropdown-list" onClick={onClick}>{list}</li>;
}

// common cardbox
export const GrayBorderBox = (props) => {
  return (
    <div className="gray-border-box">
      {props.boxtitle && props.boxtitle.length > 0 ? (
        <h3 className="gray-box-title">{props.boxtitle}</h3>
      ) 
      : (
        ""
      )}
      {props.btnupload ? (
          <button  onClick={() => { props.previewlinkDisabled === false && props.onClick() }} type="button"  className={`custom-button custom-outline btn ${props.previewlinkDisabled ? `disabled-text` : `c-pointer`}`}>
              <img src={IconUploadImages} className="upload-images" alt="placeholder" />
              {props.previewlink}
          </button>
      ) : (
          ""
      )}
      {props.children}
      <span className="gray-box-link mt-2 d-inline-block" {...props}>
        {props.linkname}
      </span>
      
    </div>
  );
};

// Alert Notification
export const AlertNotification = (props) => {
  return (
    <Alert variant={props.variant} className="d-flex align-items-center mb-4">
      <img src={InfoIcon} alt="Information" />
      <h4 className="common-text text-black">{props.errormessage}</h4>
    </Alert>
  );
};

export const AddNewAttribute = (props) => {
  let [toggle, setToggle] = useState(false);
  return (
    <>
      {props.image ? (
        <img
          src={IconAddTree}
          alt="Add tree"
          className="add-tree-icon"
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      ) : (
        <AttributeButton
          attributeName={props.attributeName}
          size={props.size}
          variant={props.variant}
          className="attribute-button"
          onClick={() => {
            setToggle(!toggle);
          }}
        />
      )}

      <div className={`${toggle ? `option-group d-block` : "option-group"}`}>
        <h4>No. of options</h4>
        <ul className="add-option-group d-flex flex-wrap">
          <li
            className="option-group-items"
            onClick={() => {
              // props.onSaveNumber(1);
              props.onSaveNumber({
                num_option: 1,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            1
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              // props.onSaveNumber(2);
              props.onSaveNumber({
                num_option: 2,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            2
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 3,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            3
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 4,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            4
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 5,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            5
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 6,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            6
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 7,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            7
          </li>
          <li
            className="option-group-items"
            onClick={() => {
              props.onSaveNumber({
                num_option: 8,
                parent_id: props.parent_id ? props.parent_id : null,
              });
              setToggle(!toggle);
            }}
          >
            8
          </li>
          <li className="option-group-items">...</li>
        </ul>
      </div>

      {/* <AddOptions className={`${toggle ? `option-group d-block` : 'option-group'}`} /> */}
    </>
  );
};

export const ShowroomModal = (props) => {
  return (
    <Modal
      show={props.show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.onHide}
      // onSave={props.onSave}
      className={props.className}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalheading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <CustomButton
          onClick={props.onHide}
          name={props.cancelbutton}
          className="custom-button border-button"
        />
        <CustomButton
          onClick={props.onSave}
          name={props.removebutton}
          className="custom-button"
        />
      </Modal.Footer>
    </Modal>
  );
};

export const ShowroomProduct = (props) => {
  return (
    <div className="show-room-product-list position-relative">
      <img
        src={props.image ? props.image : DefaultThumbnail}
        alt="product-Thumbnail"
      />
      <label className="select-product">
        <input
          type="checkbox"
          name="product-name"
          id="product_name"
          checked={props.selected === 1}
          onChange={(e) => {
            props.selected !== 1 && props.onSave(props.id, props.parent);
          }}
        />
        <span className="checked-product"></span>
      </label>
      <h5 className="category-product-title">{props.ProductName}</h5>
    </div>
  );
};

// Service order design
export const StoreOrder = (props) => {
  return (
    <div className="d-flex align-items-center customer-order-detail flex-wrap">
      <img src={props.product_image
              ? props.product_image
              : OrderImage} className="order-image" alt="Order view" />
      <div className="customer-order d-flex align-items-center justify-content-between">
        <h4>{props.ordername}</h4>
        <span className="common-text">${props.ordervalue}</span>
      </div>
    </div>
  );
};

export function ProductCategoryListing(props) {
  return (
    props.res.length > 0 &&
    props.res.map((index, val) => (
      <Accordion.Item eventKey={index[0].id} key={index[0].id}>
        {index.map((attribute) => {
          const tags = [];
          attribute.selected_items.forEach((element) => {
            tags.push(element.name)
          })
          // if (attribute.visible === 1) {
          return (
            <React.Fragment key={attribute.id}>
              {attribute.level === 0 && (
                <Accordion.Header>
                  <div
                    className={`category-header d-flex align-items-center justify-content-between w-100`}
                  >
                    <div className="d-flex">
                      <h5 className="showroom-accordian-title">
                        {attribute.name}
                      </h5>
                      <span className="product-category-name">
                        {tags.join(', ')}
                      </span>
                    </div>
                    <div className="d-flex align-items-center">
                      {attribute.values &&
                        attribute.values.map(
                          (sub) =>
                            sub.selected === 1 && (
                              <img
                                src={sub.image ? sub.image : DefaultThumbnail}
                                className="accordian-header-image"
                                alt="Default"
                                key={sub.id}
                              />
                            )
                        )}
                    </div>
                  </div>
                </Accordion.Header>
              )}
              {(attribute.level === 0) ? (
              <Accordion.Body
                key={attribute.id}
                className={`${attribute.visible === 1 ? `d-block` : `d-none`}`}
              >
                <div className={`sub-categories-views`}>
                <div className="d-flex flex-wrap">
                  {attribute.values.map((sub) => (
                    <ShowroomProduct
                      ProductName={sub.name}
                      key={sub.id}
                      selected={sub.selected}
                      id={sub.id}
                      onSave={props.onChange}
                      parent={attribute.id}
                      image={sub.image}
                    // checked={sub.selected === 1 ? true : false}
                    />
                  ))}
                </div>
                </div>
              </Accordion.Body>
              ) : (
              <Accordion.Body
                key={attribute.id}
                className={`${attribute.visible === 1 ? `d-block` : `d-none`}`}
              >
                <div className={`sub-categories-views`}>
                <Accordion.Header className="preview_title">
                  <h5 className="showroom-accordian-title mb-3">
                    {attribute.name}
                  </h5>
                  </Accordion.Header>
                  <div className="d-flex flex-wrap">
                    {attribute.values.map((sub) => (
                      <ShowroomProduct
                        ProductName={sub.name}
                        key={sub.id}
                        selected={sub.selected}
                        id={sub.id}
                        onSave={props.onChange}
                        parent={attribute.id}
                        image={sub.image}
                        // checked={sub.selected === 1 ? true : false}
                      />
                    ))}
                  </div>
                </div>
              </Accordion.Body>
              )}
            </React.Fragment>
          );
        })}
      </Accordion.Item>
    ))
  );
}


export const Chipset = (props) => {
  return (
    <span className="chip">
      {props.chipname}
      <img src={CloseChip} className="c-pointer" alt="Close chip" onClick={() => props.deleteFont(props.chipid)}/>
    </span>
  );
}; 

export const CategoryChipset = (props) => {
  return (
    <span className="chip">
      {props.chipname}
      <img src={CloseChip} className="c-pointer" alt="Close chip" onClick={() => props.deleteCategory(props.chipid)}/>
    </span>
  );
}; 
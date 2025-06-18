import React, { JSX } from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  id?: string;
  placeholder?: string;
  label?: string;
  name?: string;
  showLabel?: boolean;
  onChange: (content: string) => void;
  value?: string;
  disabled?: boolean;
  append?: JSX.Element;
  prepend?: JSX.Element;
};

const CustomTextEditor = ({
  //   id,
  //   placeholder,
  //   label,
  name,
  //   showLabel,
  onChange,
  value,
  //   append,
  //   prepend,
  disabled,
  ...props
}: Props) => {
  return (
    <Editor
      {...props}
      tagName={name}
      value={value}
      onEditorChange={(content: string) => {
        onChange(content);
      }}
      disabled={disabled}
      apiKey="8zld1gydgqgqspxzjnu3dwlbt4xd05jyupvrwuwqswza1bse"
      init={{
        body_class: "tinymce_editor",
        skin: "naked",
        height: 1000,
        icons: "thin",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        imagetools_cors_hosts: ["picsum.photos"],

        menubar: true,

        toolbar_sticky: false,
        // autosave_ask_before_unload: true,
        // autosave_interval: '30s',
        // autosave_prefix: '{path}{query}-{id}-',
        // autosave_restore_when_empty: false,
        // autosave_retention: '2m',
        image_advtab: true,
        link_list: [
          { title: "My page 1", value: "http://www.tinymce.com" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_list: [
          { title: "My page 1", value: "http://www.tinymce.com" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,

        templates: [
          {
            title: "New Table",
            description: "creates a new table",
            content: `<table style="border-collapse: collapse; width: 100%; height: 275.8125px;" border="1">
      <tbody>
        <tr style="height: 95.8125px;">
          <td style="width: 16.7769%; height: 95.8125px;">
            <h2>Sizeguide in cm - man</h2>
          </td>
          <td style="width: 13.9808%; height: 95.8125px;">XS</td>
          <td style="width: 13.7145%; height: 95.8125px;">S</td>
          <td style="width: 13.7145%; height: 95.8125px;">M</td>
          <td style="width: 13.9808%; height: 95.8125px;">L</td>
          <td style="width: 13.7145%; height: 95.8125px;">XL</td>
          <td style="width: 13.9808%; height: 95.8125px;">XXL</td>
        </tr>
        <tr style="height: 18px;">
          <td style="width: 16.7769%; height: 18px;">A - chest</td>
          <td style="width: 13.9808%; height: 18px;">86</td>
          <td style="width: 13.7145%; height: 18px;">92</td>
          <td style="width: 13.7145%; height: 18px;">98</td>
          <td style="width: 13.9808%; height: 18px;">104</td>
          <td style="width: 13.7145%; height: 18px;">110</td>
          <td style="width: 13.9808%; height: 18px;">116</td>
        </tr>
        <tr style="height: 18px;">
          <td style="width: 16.7769%; height: 18px;">B - waist</td>
          <td style="width: 13.9808%; height: 18px;">72</td>
          <td style="width: 13.7145%; height: 18px;">78</td>
          <td style="width: 13.7145%; height: 18px;">84</td>
          <td style="width: 13.9808%; height: 18px;">90</td>
          <td style="width: 13.7145%; height: 18px;">96</td>
          <td style="width: 13.9808%; height: 18px;">102</td>
        </tr>
        <tr style="height: 72px;">
          <td style="width: 16.7769%; height: 72px;">C - SLEEVELENGTH FROM SHOULDER</td>
          <td style="width: 13.9808%; height: 72px;">59,5</td>
          <td style="width: 13.7145%; height: 72px;">61</td>
          <td style="width: 13.7145%; height: 72px;">62,5</td>
          <td style="width: 13.9808%; height: 72px;">64</td>
          <td style="width: 13.7145%; height: 72px;">65,5</td>
          <td style="width: 13.9808%; height: 72px;">67</td>
        </tr>
        <tr style="height: 54px;">
          <td style="width: 16.7769%; height: 54px;">d - HIP APROX. 20 CM FROM WAIST</td>
          <td style="width: 13.9808%; height: 54px;">89</td>
          <td style="width: 13.7145%; height: 54px;">95</td>
          <td style="width: 13.7145%; height: 54px;">101</td>
          <td style="width: 13.9808%; height: 54px;">107</td>
          <td style="width: 13.7145%; height: 54px;">113</td>
          <td style="width: 13.9808%; height: 54px;">119</td>
        </tr>
        <tr style="height: 18px;">
          <td style="width: 16.7769%; height: 18px;">E - INSEAM</td>
          <td style="width: 13.9808%; height: 18px;">77,5</td>
          <td style="width: 13.7145%; height: 18px;">79</td>
          <td style="width: 13.7145%; height: 18px;">80,5</td>
          <td style="width: 13.9808%; height: 18px;">82</td>
          <td style="width: 13.7145%; height: 18px;">83,5</td>
          <td style="width: 13.9808%; height: 18px;">85,5</td>
        </tr>
      </tbody>
    </table>`,
          },
          {
            title: "Starting my story",
            description: "A cure for writers block",
            content: "Once upon a time...",
          },
          {
            title: "New list with dates",
            description: "New List with dates",
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "sliding",
        contextmenu: "",
      }}
    />
  );
};

export default CustomTextEditor;

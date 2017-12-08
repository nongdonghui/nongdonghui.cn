---
layout: post
title: Java打印SAP提供的RFC接口信息
categories: java
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

1.存放字段信息类

```
import java.util.ArrayList;
import java.util.List;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import com.sap.conn.jco.JCoField;
import com.sap.conn.jco.JCoFieldIterator;
import static com.eppen.sap.StringHelper.captalizeFirstChar;
import static com.eppen.sap.StringHelper.smallizeFirstChar;
import static com.eppen.sap.StringHelper.titleize;

/**
 * Class to map SAP types to Java types
 * 
 * @author Emerson Rancoletta
 * @version = 1.0
 */
public class Sap2JavaField {
	//private static Logger logger = LoggerFactory.getLogger(Sap2JavaField.class);

	private String sapName;
	private String sapDescription;
	private String sapType;
	private int sapLength;
	private int sapDecimals;
	private List<Sap2JavaField> listSubField;

	/**
	 * Constructor for final types, not for STRUCTURES or TABLES that have
	 * subtypes, for these types use the constructor with sub fields list as
	 * parameter.
	 * 
	 * @param sapName
	 *            SAP parameter name
	 * @param sapType
	 *            SAP data type
	 * @param sapLength
	 *            SAP length
	 * @param sapDecimals
	 *            SAP decimal length
	 */
	public Sap2JavaField(String sapName, String sapDescription, String sapType,
			int sapLength, int sapDecimals) {
		this.sapName = sapName;
		this.sapDescription = sapDescription;
		this.sapType = sapType;
		this.sapLength = sapLength;
		this.sapDecimals = sapDecimals;
	}

	/**
	 * Constructor for STRUCTURES or TABLES that have subtypes.
	 * 
	 * @param sapName
	 *            SAP parameter name
	 * @param sapType
	 *            SAP data type
	 * @param sapLength
	 *            SAP length
	 * @param sapDecimals
	 *            SAP decimal length
	 */
	public Sap2JavaField(String sapName, String sapDescription, String sapType,
			int sapLength, int sapDecimals, List<Sap2JavaField> listSubField) {
		this(sapName, sapDescription, sapType, sapLength, sapDecimals);
		this.listSubField = listSubField;
	}

	/**
	 * Return SAP parameter name
	 * 
	 * @return SAP parameter name
	 */
	public String getSapName() {
		return sapName;
	}

	/**
	 * Return SAP parameter description
	 * 
	 * @return SAP parameter description
	 */
	public String getSapDescription() {
		return sapDescription;
	}

	/**
	 * Return JAVA attribute name
	 * 
	 * @return JAVA attribute name
	 */
	public String getJavaAttributeName() {
		String javaName = smallizeFirstChar(titleize(
				sapName.replaceAll("[-_.]", " ")).replace(" ", ""));

		if (this.isTable()) {
			javaName = javaName.concat("s");
		}

		return javaName;
	}

	/**
	 * Return JAVA name for naming getters and setters.
	 * 
	 * @return JAVA getter and setter name
	 */
	public String getGetterSetterName() {
		return captalizeFirstChar(getJavaAttributeName());
	}

	/**
	 * Return SAP data type
	 * 
	 * @return SAP data type
	 */
	public String getSapType() {
		return sapType;
	}

	/**
	 * Return JAVA data type correspondent to SAP data type
	 * 
	 * @return JAVA data type
	 */
	public String getJavaAttributeType() {
		String type = "";
		
		if (this.isStructure() || this.isTable()) {
			type = captalizeFirstChar(titleize(sapName.replaceAll("[-_.]", " "))
					.replace(" ", ""));

			if (this.isTable()) {
				type = "List<".concat(type).concat(">");
			}

		} else {
			if ("CHAR".equals(sapType)) {
				type = "String";
			} else if ("DATE".equals(sapType)) {
				type = "Date";
			} else if ("STRING".equals(sapType)) {
				type = "String";
			} else if ("NUM".equals(sapType)) {
				type = "Long";
			} else if ("BCD".equals(sapType)) {
				type = "BigDecimal";
			} else if ("INT".equals(sapType)) {
				type = "Integer";
			} else if ("TIME".equals(sapType)) {
				type = "Date";
			} else {
				type = "UNAVAILABLE";
			}
		}

		return type;
	}

	/**
	 * Return Java class related to this field
	 * 
	 * @return Java class
	 */
	public String getJavaClassName() {
		if (this.isTable()) {
			return captalizeFirstChar(titleize(sapName.replaceAll("[-_.]", " "))
					.replace(" ", ""));
		} else {
			return captalizeFirstChar(getJavaAttributeType());
		}
	}

	/**
	 * Return JCo data type correspondent to SAP data type
	 * 
	 * @return JCo Type
	 */
	public String getJCoReturnType() {
		if (sapType.equals("INT")) {
			return "Int";
		} else if (sapType.equals("TIME")) {
			return "Time";
		} else if (this.isStructure()) {
			return "Structure";
		} else if (this.isTable()) {
			return "Table";
		} else {
			return getJavaAttributeType();
		}
	}

	/**
	 * Get SAP length
	 * 
	 * @return SAP length
	 */
	public int getSapLength() {
		return sapLength;
	}

	/**
	 * Get SAP decimals
	 * 
	 * @return SAP decimals length
	 */
	public int getSapDecimals() {
		return sapDecimals;
	}

	/**
	 * Get sub fields for STRUCTURE and TABLE
	 * 
	 * @return Sub fields for STRUCTURE and TABLE
	 */
	public List<Sap2JavaField> getListSubField() {
		return listSubField;
	}

	/**
	 * Return if it is a final type, just STRUCTURE and TABLE is not a final
	 * type.
	 * 
	 * @return just final type return true.
	 */
	public boolean isFinalLevel() {
		return !sapType.equals("STRUCTURE") && !sapType.equals("TABLE");
	}

	/**
	 * Return if it is a STRUCTURE type.
	 * 
	 * @return just STRUCTURE returns true.
	 */
	public boolean isStructure() {
		return sapType.equals("STRUCTURE");
	}

	/**
	 * Return if it is a TABLE type.
	 * 
	 * @return just TABLE returns true.
	 */
	public boolean isTable() {
		return sapType.equals("TABLE");
	}

	/**
	 * Transform SAP field list to a easy to handle class Sap2JavaField
	 * 
	 * @param parmIterator
	 *            Iterator of SAP fields
	 * @return List of Sap2JavaField
	 */
	public static List<Sap2JavaField> mapTypes(JCoFieldIterator parmIterator) {
		List<Sap2JavaField> locFields = new ArrayList<Sap2JavaField>();

		parmIterator.reset();
		while (parmIterator.hasNextField()) {
			JCoField field = parmIterator.nextField();

			/*logger.info("Field {} type {} length {} decimal {}.",
					field.getName(), field.getTypeAsString(),
					field.getLength(), field.getDecimals());*/
			
			if (field.getTypeAsString().equals("STRUCTURE")) {
				List<Sap2JavaField> subFields = mapTypes(field.getStructure()
						.getFieldIterator());
				locFields.add(new Sap2JavaField(field.getName(), field
						.getDescription(), field.getTypeAsString(), field
						.getLength(), field.getDecimals(), subFields));
			} else if (field.getTypeAsString().equals("TABLE")) {
				List<Sap2JavaField> subFields = mapTypes(field.getTable()
						.getFieldIterator());
				locFields.add(new Sap2JavaField(field.getName(), field
						.getDescription(), field.getTypeAsString(), field
						.getLength(), field.getDecimals(), subFields));
			} else {
				locFields.add(new Sap2JavaField(field.getName(), field
						.getDescription(), field.getTypeAsString(), field
						.getLength(), field.getDecimals()));
				// System.out.println(String.format("%-32s%s(%s,%s)\t%s", field.getName(), field.getTypeAsString(), field.getLength(), field.getDecimals(), field.getDescription() ));
			}
		}

		return locFields;
	}
}
```

2.打印类

```
public static void queryFunctionDefinition(String functionName) throws JCoException {
	JCoDestination destination = null;
	destination = SapConnection.connect();
	
	JCoFunction function = destination.getRepository().getFunction(functionName);
	
	System.out.println();
	System.out.println("【接口信息-start】");
	System.out.println("接口名称：" + functionName);
	System.out.println();
	System.out.println("传入参数名称：");
	getImportParameters(function);
	System.out.println();
	System.out.println("传出参数名称：");
	getExportParameters(function);
	System.out.println();
	System.out.println("Table参数名称：");
	getTableParameters(function);
	System.out.println();
	
	System.out.println("----------------传入参数详细----------start----------------");
	List<Sap2JavaField> imports = Sap2JavaField.mapTypes(function.getImportParameterList().getFieldIterator());
	if (imports != null && !imports.isEmpty()) {
		for (Sap2JavaField imp : imports) {
			if ("STRUCTURE".equals(imp.getSapType())) {
				System.out.println(String.format("%-32s%-15s%s", imp.getSapName(), imp.getSapType(), imp.getSapDescription() + "：结构信息start----" ));
				List<Sap2JavaField> subStructures = imp.getListSubField();
				for (Sap2JavaField sub : subStructures) {
					System.out.println(String.format("%-32s%s(%s,%s)\t%s", sub.getSapName(), sub.getSapType(), sub.getSapLength(), sub.getSapDecimals(), sub.getSapDescription() ));
				}
				System.out.println(String.format("%-32s%-15s%s", imp.getSapName(), imp.getSapType(), imp.getSapDescription() + "：结构信息end------" ));
				System.out.println();
			} else {
				System.out.println(String.format("%-32s%s(%s,%s)\t%s", imp.getSapName(), imp.getSapType(), imp.getSapLength(), imp.getSapDecimals(), imp.getSapDescription() ));
			}
		}
	} else {
		System.out.println("无传入参数");
	}
	System.out.println("----------------传入参数详细----------end------------------\n");
	
	System.out.println("----------------传出参数详细----------start----------------");
	List<Sap2JavaField> exports = Sap2JavaField.mapTypes(function.getExportParameterList().getFieldIterator());
	if (exports != null && !exports.isEmpty()) {
		for (Sap2JavaField exp : exports) {
			if ("STRUCTURE".equals(exp.getSapType())) {
				System.out.println(String.format("%-32s%-15s%s", exp.getSapName(), exp.getSapType(), exp.getSapDescription() + "：结构信息start----" ));
				List<Sap2JavaField> subStructures = exp.getListSubField();
				for (Sap2JavaField sub : subStructures) {
					System.out.println(String.format("%-32s%s(%s,%s)\t%s", sub.getSapName(), sub.getSapType(), sub.getSapLength(), sub.getSapDecimals(), sub.getSapDescription() ));
				}
				System.out.println(String.format("%-32s%-15s%s", exp.getSapName(), exp.getSapType(), exp.getSapDescription() + "：结构信息end------" ));
				System.out.println();
			} else {
				System.out.println(String.format("%-32s%s(%s,%s)\t%s", exp.getSapName(), exp.getSapType(), exp.getSapLength(), exp.getSapDecimals(), exp.getSapDescription() ));
			}
		}
	} else {
		System.out.println("无传出参数");
	}
	System.out.println("----------------传出参数详细----------end------------------\n");
	
	System.out.println("----------------Table参数详细----------start----------------");
	List<Sap2JavaField> tables = Sap2JavaField.mapTypes(function.getTableParameterList().getFieldIterator());
	if (tables != null && !tables.isEmpty()) {
		for (Sap2JavaField tab : tables) {
			if ("TABLE".equals(tab.getSapType())) {
				System.out.println(String.format("%-32s%-15s%s", tab.getSapName(), tab.getSapType(), tab.getSapDescription() + "：Table信息start----" ));
				List<Sap2JavaField> subStructures = tab.getListSubField();
				for (Sap2JavaField sub : subStructures) {
					System.out.println(String.format("%-32s%s(%s,%s)\t%s", sub.getSapName(), sub.getSapType(), sub.getSapLength(), sub.getSapDecimals(), sub.getSapDescription() ));
				}
				System.out.println(String.format("%-32s%-15s%s", tab.getSapName(), tab.getSapType(), tab.getSapDescription() + "：Table信息end------" ));
				System.out.println();
			} else {
				System.out.println(String.format("%-32s%s(%s,%s)\t%s", tab.getSapName(), tab.getSapType(), tab.getSapLength(), tab.getSapDecimals(), tab.getSapDescription() ));
			}
		}
	} else {
		System.out.println("无Table参数");
	}
	System.out.println("----------------Table参数详细----------end------------------\n");
	
	
	System.out.println();
	System.out.println("【接口信息-end】");
}
```

**更新列表：**

*



**参考文章：**

* [][1]


[1]: 
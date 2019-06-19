# Override Cordova project `config.xml`

It is possible to override the Cordova project config file located at
`src/targets/mobile/config.xml` before building the app.

To achieve that, you have to declare a `mobileConfigTransformFile`
attribute inside a JSON file whose path is declared in
`OVERRIDE_CONFIG_FILE`.

```
echo '{"mobileConfigTransformFile":"./override-config.xsl"}' > ./override-config.json
env OVERRIDE_CONFIG_FILE=$(pwd)/override-config.json yarn android:run
```

Don't worry about this XSL thing, this is not that hard, just a little verbose.
Still, this is a good way to customize an XML document. Here is an example XSL
that customizes the app's name and identifiers on stores:

```xml
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:widget="http://www.w3.org/ns/widgets">
  <!-- Copy the original file -->
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>

  <!-- Customize Android package name on store -->
  <xsl:template match="widget:widget/@android-packageName">
    <xsl:attribute name="android-packageName">
      <xsl:value-of select="'io.cozy.my-custom-banks'"/>
    </xsl:attribute>
  </xsl:template>

  <!-- Customize iOS package name on store -->
  <xsl:template match="widget:widget/@ios-CFBundleIdentifier">
    <xsl:attribute name="ios-CFBundleIdentifier">
      <xsl:value-of select="'io.cozy.my-custom-banks'"/>
    </xsl:attribute>
  </xsl:template>

  <!-- Customize app name -->
  <xsl:template match="widget:widget/widget:name">
    <name>My App Name</name>
  </xsl:template>
</xsl:stylesheet>
```
